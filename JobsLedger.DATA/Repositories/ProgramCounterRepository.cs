using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace JobsLedger.DATA.Repositories
{
    public class ProgramCounterRepository : EntityBaseRepository<ProgramCounter>, IProgramCounterRepository
    {
        public ProgramCounterRepository(JobsLedgerAPIContext context) : base(context)
        { }

        public int RetrieveNewEntityNumber(string programCounterName)
        {
            var programCounterType = GetSingle(p => p.Name == programCounterName);

            programCounterType.Value = programCounterType.Value + 1;

            Edit(programCounterType);
            Commit();

            return programCounterType.Value;
        }
    }
}
