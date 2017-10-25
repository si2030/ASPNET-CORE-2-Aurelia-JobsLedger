using System.IdentityModel.Tokens.Jwt;

namespace JobsLedger.DATA.DataServices
{
    public class TokenResult
    {
        public string Jwt { get; set; }
        public int expires_in { get; set; }
        public bool Succeeded { get; set; }
        public string Message { get; set; }
    }
}
