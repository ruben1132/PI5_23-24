namespace Mpt.Dtos
{
    public class UserIsApprovedDto
    {

        public string IsApproved { get; set; }

        public UserIsApprovedDto( string isApproved )
        {
            this.IsApproved = isApproved;
        }


    }

}