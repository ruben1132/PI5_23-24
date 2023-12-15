namespace Mpt.Dtos
{
    public class RobotMovementDto
    {
        public int X { get; private set; }
        public int Y { get; private set; }

        public RobotMovementDto(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }


    }
}