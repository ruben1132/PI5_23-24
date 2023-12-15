

using Mpt.Domain.Shared;
using Mpt.Domain.Tasks;
using Mpt.Domain.Users;
using Mpt.Dtos;

namespace Mpt.Mappers
{
    public class TaskMapper
    {
        public static TaskDto ToDto(Mpt.Domain.Tasks.Task task, UserTaskInfoDto? user = null)
        {
            return new TaskDto(
                task.Id.Value,
                task.Path,
                task.IsCompleted,
                task.TaskType,
                user,
                task.IsApproved
            );

        }

        public static SurveillanceTaskDto ToDto(SurveillanceTask surveillanceTask, string floorCode, UserTaskInfoDto user)
        {
            return new SurveillanceTaskDto(
                surveillanceTask.Id.Value,
                surveillanceTask.Path,
                surveillanceTask.IsCompleted,
                surveillanceTask.TaskType,
                surveillanceTask.PhoneNumber.Value,
                floorCode,
                user,
                surveillanceTask.IsApproved
            );
        }

        public static PickupDeliveryTaskDto ToDto(PickupDeliveryTask pickupDeliveryTask, UserTaskInfoDto user)
        {
            return new PickupDeliveryTaskDto(
                pickupDeliveryTask.Id.Value,
                pickupDeliveryTask.Path,
                pickupDeliveryTask.IsCompleted,
                pickupDeliveryTask.TaskType,
                pickupDeliveryTask.PickupPersonName,
                pickupDeliveryTask.PickupPersonPhoneNumber.Value,
                pickupDeliveryTask.DeliveryPersonName,
                pickupDeliveryTask.DeliveryPersonPhoneNumber.Value,
                pickupDeliveryTask.TaskDescription,
                pickupDeliveryTask.ConfirmationCode.Value,
                pickupDeliveryTask.OriginType,
                pickupDeliveryTask.Origin,
                pickupDeliveryTask.DestinyType,
                pickupDeliveryTask.Destiny,
                user,
                pickupDeliveryTask.IsApproved
            );
        }

        public static SurveillanceTask ToSurveillanceDomain(CreateSurveillanceTaskDto dto, string userId, string floorCode)
        {
            return new SurveillanceTask(
                new UserId(userId),
                "Surveillance",
                new List<string>() { floorCode },
                new List<List<RobotMovement>>(),
                new PhoneNumber(dto.PhoneNumber),
                dto.FloorId
            );
        }

        public static PickupDeliveryTask ToPickupDeliveryDomain(CreatePickupDeliveryTaskDto dto, string userId, PathMovementDto pm)
        {
            return new PickupDeliveryTask(
                new UserId(userId),
                "PickupDelivery",
                pm.Path,
                RobotMovementBulkToDomain(pm.Movements),
                dto.OriginType,
                dto.Origin,
                dto.DestinyType,
                dto.Destiny,
                dto.TaskDescription,
                dto.PickupPersonName,
                new PhoneNumber(dto.PickupPersonPhoneNumber),
                dto.DeliveryPersonName,
                new PhoneNumber(dto.DeliveryPersonPhoneNumber),
                new TaskConfirmationCode()
            );
        }

        public static List<List<RobotMovement>> RobotMovementBulkToDomain(List<List<RobotMovementDto>> dto)
        {
            List<List<RobotMovement>> robotMovements = new List<List<RobotMovement>>();

            foreach (var item in dto)
            {
                List<RobotMovement> m = new List<RobotMovement>();

                foreach (var item2 in item)
                {
                    m.Add(new RobotMovement(item2.X, item2.Y));
                }

                robotMovements.Add(m);
            }

            return robotMovements;
        }

        public static List<List<RobotMovementDto>> RobotMovementBulkToDto(List<List<RobotMovement>> dto)
        {

            List<List<RobotMovementDto>> robotMovements = new List<List<RobotMovementDto>>();

            foreach (var item in dto)
            {
                List<RobotMovementDto> m = new List<RobotMovementDto>();

                foreach (var item2 in item)
                {
                    m.Add(new RobotMovementDto(item2.X, item2.Y));
                }

                robotMovements.Add(m);
            }

            return robotMovements;
        }
    }
}

