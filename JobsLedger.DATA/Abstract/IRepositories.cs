using JobsLedger.MODEL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobsLedger.DATA.Abstract
{
    public interface IBrandRepository : IEntityBaseRepository<Brand> { }

    public interface IClientRepository : IEntityBaseRepository<Client>
    {
        void RelatedSuburbEntities(Suburb _addressLocation);
    }

    public interface ICompanyDetailRepository : IEntityBaseRepository<CompanyDetail> { }

    public interface ILoggingRepository : IEntityBaseRepository<Error> { }

    public interface IErrorRepository : IEntityBaseRepository<Error> { }

    public interface IJobRepository : IEntityBaseRepository<Job>
    {
        void RelatedJobEnities(ICollection<Job> _jobs);
        void RelatedJobEnities(Job _job);
    }

    public interface IJobTypeRepository : IEntityBaseRepository<JobType> { }

    public interface IProgramCounterRepository : IEntityBaseRepository<ProgramCounter>
    {
        int RetrieveNewEntityNumber(string _programCounterName);
    }

    public interface IRoleRepository : IEntityBaseRepository<Role> { }

    public interface IStateRepository : IEntityBaseRepository<State> { }

    public interface IStatusRepository : IEntityBaseRepository<Status> { }

    public interface ISuburbRepository : IEntityBaseRepository<Suburb> { }

    public interface IUserRepository : IEntityBaseRepository<User>
    {
        User GetSingleByUsername(string username);
        int GetSingleUserIdByUserName(string username);
        IEnumerable<Role> GetUserRoles(string username);
    }

    public interface IUserRoleRepository : IEntityBaseRepository<UserRole> { }
}
