using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobsLedger.MODEL.Entities
{
    public class ProgramCounter : IEntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
    }
}
