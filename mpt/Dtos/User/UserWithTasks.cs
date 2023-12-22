﻿
namespace Mpt.Dtos
{
    public class UserWithTasks
    {

        public UserDto user { get; private set; }
        public List<TaskSimpleDto> tasks { get; private set; }

        public UserWithTasks(UserDto user, List<TaskSimpleDto> tasks)
        {
            this.user = user;
            this.tasks = tasks;
        }


    }
}
