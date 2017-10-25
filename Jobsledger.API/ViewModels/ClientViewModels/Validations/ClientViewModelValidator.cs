using FluentValidation;
using JobsLedger.API.ViewModels.Clients;

namespace JobsLedger.API.ViewModels.ClientViewModels.Validations
{
    public class ClientViewModelValidator : AbstractValidator<ClientDetailsViewModel>
    {
        public ClientViewModelValidator()
        {
            RuleFor(client => client.Company).NotEmpty().WithMessage("Company cannot be empty");
            RuleFor(client => client.ClientFirstName).NotEmpty().WithMessage("First name cannot be empty");
            RuleFor(client => client.ClientLastName).NotEmpty().WithMessage("Last name cannot be empty");
            RuleFor(client => client.Address1).NotEmpty().WithMessage("Street address cannot be empty");
            RuleFor(client => client.Suburb).NotEmpty().WithMessage("Suburb cannot be empty");
        }
    }
}


