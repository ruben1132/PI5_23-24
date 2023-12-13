using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class TokenDto
    {
        public string Token { get; private set; }

        public TokenDto(string token)
        {
            this.Token = token;
        }

    }

}
