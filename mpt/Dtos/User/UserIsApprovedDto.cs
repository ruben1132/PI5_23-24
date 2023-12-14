namespace Mpt.Dtos
{
    public class UserIsApprovedDto
    {

        public bool IsApproved { get; set; }

        public UserIsApprovedDto( bool isApproved )
        {
            this.IsApproved = isApproved;
        }


    }

}