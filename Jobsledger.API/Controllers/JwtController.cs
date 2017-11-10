using Jobsledger.API.Models;
using Jobsledger.API.Options;
using JobsLedger.API.ViewModels;
using JobsLedger.DATA;
using JobsLedger.DATA.Abstract;
using JobsLedger.DATA.DataServices;
using JobsLedger.DATA.DataServices.Abstract;
using JobsLedger.MODEL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;

namespace WebApiJwtAuthDemo.Controllers
{
    [Route("api/[controller]")]
    public class JwtController : Controller
    {
        #region Variables
        private readonly IMembershipService membershipService;
        private readonly IUserRepository userRepository;
        private readonly ILoggingRepository loggingRepository;
        private readonly ILogger logger;
        private readonly JwtIssuerOptions jwtOptions;
        private readonly JsonSerializerSettings serializerSettings;
        #endregion

        public JwtController(IMembershipService membershipService,
                             IUserRepository userRepository,
                             ILoggingRepository _errorRepository,
                             IOptions<JwtIssuerOptions> jwtOptions,
                             ILoggerFactory loggerFactory
                             )

        {
            this.membershipService = membershipService;
            this.userRepository = userRepository;
            loggingRepository = _errorRepository;

            this.jwtOptions = jwtOptions.Value;
            ThrowIfInvalidOptions(this.jwtOptions);

            logger = loggerFactory.CreateLogger<JwtController>();

            serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromBody] LoginViewModel model)
        {
            MembershipContext _userContext = membershipService.ValidateUser(model.Username, model.Password);

            if (_userContext.User == null)
            {
                logger.LogInformation($"Invalid username ({model.Username}) or password ({model.Password})");
                return BadRequest("Invalid credentials");
            }

            //var claims = new[]
            var claims = new List<Claim>();
            {
                new Claim(JwtRegisteredClaimNames.Sub, model.Username);
                new Claim(JwtRegisteredClaimNames.Jti, await jwtOptions.JtiGenerator());
                new Claim(JwtRegisteredClaimNames.Iat,
                                                        ToUnixEpochDate(jwtOptions.IssuedAt).ToString(),
                                                        ClaimValueTypes.Integer64);
            };

            // Add the roles.
            foreach (UserRole userRole in _userContext.User.UserRoles)
            {
                Claim RoleClaim = new Claim(ClaimTypes.Role, userRole.Role.Name);
                claims.Add(RoleClaim);
            };

            // Add the userName
            Claim userClaim = new Claim(ClaimTypes.Name, _userContext.User.UserName);
            claims.Add(userClaim);


            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: jwtOptions.Issuer,
                audience: jwtOptions.Audience,
                claims: claims,
                notBefore: jwtOptions.NotBefore,
                expires: jwtOptions.Expiration,
                signingCredentials: jwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            // Serialize and return the response
            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds,
            };

            var json = JsonConvert.SerializeObject(response, serializerSettings);
            return new OkObjectResult(json);
        }

        [Route("userdetail")]
        [HttpGet]
        [Authorize]
        public IActionResult GetUserDetail()
        {

            var identity = this.User.Identity as ClaimsIdentity;
            if (identity == null || !identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var response = new
            {
                // Both these use an Identity custom extension method down the bottom.
                username = identity.GetName(),

                roles = identity.Roles()
            };
            var json = JsonConvert.SerializeObject(response, serializerSettings);

            return new OkObjectResult(json);
        }

        [Route("register")]
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegistrationViewModel user)
        {
            IActionResult _result = new ObjectResult(false);
            TokenResult _registrationResult = null;

            try
            {
                if (ModelState.IsValid)
                {
                    User _user = membershipService.CreateUser(user.UserName, user.Email, user.Password, new int[] { 1 });

                    if (_user != null)
                    {
                        _registrationResult = new TokenResult()
                        {
                            Succeeded = true,
                            Message = "Registration succeeded"
                        };
                    }
                }
                else
                {
                    _registrationResult = new TokenResult()
                    {
                        Succeeded = false,
                        Message = "Invalid fields."
                    };
                }
            }
            catch (Exception ex)
            {
                _registrationResult = new TokenResult()
                {
                    Succeeded = false,
                    Message = ex.Message
                };

                loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                loggingRepository.Commit();
            }

            _result = new ObjectResult(_registrationResult);
            return _result;
        }


        private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }

        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private static long ToUnixEpochDate(DateTime date)
          => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);

    }
}

public static class IdentityExtensions
{
    public static string GetName(this IIdentity identity)
    {
        ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
        Claim claim = claimsIdentity?.FindFirst(ClaimTypes.Name);

        return claim?.Value ?? string.Empty;
    }

    public static List<string> Roles(this ClaimsIdentity identity)
    {
        return identity.Claims
                       .Where(c => c.Type == ClaimTypes.Role)
                       .Select(c => c.Value)
                       .ToList();
    }
}