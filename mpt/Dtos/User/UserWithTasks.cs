using Mpt.Dtos;
using Domain.Users;

namespace mpt.Dtos.User
{
    public class UserWithTasks
    {

        public UserDto user { get; private set; }
        public List<TaskWithoutUserDto> tasks { get; private set; }

        public UserWithTasks(UserDto user, List<TaskWithoutUserDto> tasks)
        {
            this.user = user;
            this.tasks = tasks;
        }


    }
}
