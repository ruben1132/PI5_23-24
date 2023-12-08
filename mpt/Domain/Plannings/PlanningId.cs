using Mpt.Domain.Shared;
using Newtonsoft.Json;

namespace Mpt.Domain.Plannings
{
    public class PlanningId : EntityId
    {
        [JsonConstructor]
        public PlanningId(Guid value) : base(value)
        {
        }

        public PlanningId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }
        
        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}