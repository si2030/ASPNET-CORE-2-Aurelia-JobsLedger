using JobsLedger.API.ViewModels.AddressViewModels;
using JobsLedger.API.ViewModels.ClientViewModels;
using JobsLedger.MODEL.Entities;
using System;

namespace JobsLedger.API.ViewModels.Clients
{
    public class ClientCreateViewModel //: IValidatableObject
    {
        public ClientCreateViewModel()
        {

        }

        public bool Activity { get; set; }
        public bool Active { get; set; }
        public bool Company { get; set; }
        public string CompanyName { get; set; }
        public string Abn { get; set; }
        public string CompanyEmail { get; set; }
        public bool IsWarrantyCompany { get; set; }
        public bool RequiresPartsPayment { get; set; }
        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }
        public string MobilePhone { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Notes { get; set; }

        public ReturnedAddressViewModel Address { get; set; }

        public string BankName { get; set; }
        public string BankBSB { get; set; }
        public string BankAccount { get; set; }








        //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
        //    var validator = new ClientViewModelValidator();
        //    var result = validator.Validate(this);
        //    return result.Errors.Select(item => new ValidationResult(item.ErrorMessage, new[] { item.PropertyName }));
        //}
    }

    //public interface IValidatableObject
    //{

    //}
}