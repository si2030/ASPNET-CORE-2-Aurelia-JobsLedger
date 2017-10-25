using JobsLedger.API.ViewModels.ClientViewModels;
using JobsLedger.API.ViewModels.ClientViewModels.Validations;
using JobsLedger.MODEL.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace JobsLedger.API.ViewModels.Clients
{
    public class ClientDetailsViewModel
    {
        public ClientDetailsViewModel()
        {
            Jobs = new List<ClientJobListingViewModel>();
        }
        public int ClientId { get; set; }
        public int ClientNo { get; set; }
        public bool Company { get; set; }
        public string CompanyName { get; set; }
        public string ABN { get; set; }
        public bool IsWarrantyCompany { get; set; }
        public bool RequiresPartsPayment { get; set; }
        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string Phone { get; set; }
        public string Notes { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }

        public string Suburb { get; set; }
        public string Postcode { get; set; }
        public string StateShortName { get; set; }

        public int? AddressLocationId { get; set; }


        public string BankName { get; set; }
        public string BankBSB { get; set; }
        public string BankAccount { get; set; }
        public bool Active { get; set; }
        public string DeActivated { get; set; }
        public bool Activity { get; set; }
        public string DateCreated { get; set; }
        public string DateUpdated { get; set; }

        public int CreatorId { get; set; }
        public string CreatorName { get; set; }

        public ICollection<ClientJobListingViewModel> Jobs { get; set; }


        //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
        //    var validator = new ClientViewModelValidator();
        //    var result = validator.Validate(this);
        //    return result.Errors.Select(item => new ValidationResult(item.ErrorMessage, new[] { item.PropertyName }));
        //}
    }
}
