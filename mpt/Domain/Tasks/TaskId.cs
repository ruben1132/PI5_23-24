using System;
using Mpt.Domain.Shared;
using Newtonsoft.Json;

namespace Mpt.Domain.Tasks
{
    public class TaskId : EntityId
    {
        [JsonConstructor]
        public TaskId(Guid value) : base(value)
        {
        }

        public TaskId(String value) : base(value)
        {
        }

        public TaskId(): base()
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