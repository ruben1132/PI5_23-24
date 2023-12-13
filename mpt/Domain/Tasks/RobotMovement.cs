using Mpt.Core.Domain;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Users
{
    public class RobotMovement : IValueObject
    {
        public int X { get; private set; }
        public int Y { get; private set; }

        public RobotMovement(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            RobotMovement other = (RobotMovement)obj;
            return X == other.X && Y == other.Y;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(X, Y);
        }
    }
}


