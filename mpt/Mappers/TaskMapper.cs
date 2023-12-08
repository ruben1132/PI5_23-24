

using Mpt.Domain.Shared;
using Mpt.Domain.Tasks;
using Mpt.Domain.Users;
using Mpt.Dtos;

namespace Mpt.Mappers
{
    public class TaskMapper
    {
        public static TaskDto ToDto(Mpt.Domain.Tasks.Task task)
        {
            return new TaskDto(
                task.Id.Value,
                task.UserId.Value,
                task.RobotId,
                task.Path,
                RobotMovementBulkToDto(task.RobotMovements),
                task.IsCompleted,
                task.IsApproved,
                task.TaskType
            );

        }

        public static SurveillanceTaskDto ToDto(SurveillanceTask surveillanceTask)
        {
            return new SurveillanceTaskDto(
                surveillanceTask.Id.Value,
                surveillanceTask.UserId.Value,
                surveillanceTask.RobotId,
                surveillanceTask.Path,
                RobotMovementBulkToDto(surveillanceTask.RobotMovements),
                surveillanceTask.IsCompleted,
                surveillanceTask.IsApproved,
                surveillanceTask.TaskType,
                surveillanceTask.PhoneNumber.Value,
                surveillanceTask.FloorIds
            );
        }

        public static PickupDeliveryTaskDto ToDto(PickupDeliveryTask pickupDeliveryTask)
        {
            return new PickupDeliveryTaskDto(
                pickupDeliveryTask.Id.Value,
                pickupDeliveryTask.UserId.Value,
                pickupDeliveryTask.RobotId,
                pickupDeliveryTask.Path,
                RobotMovementBulkToDto(pickupDeliveryTask.RobotMovements),
                pickupDeliveryTask.IsCompleted,
                pickupDeliveryTask.IsApproved,
                pickupDeliveryTask.TaskType,
                pickupDeliveryTask.PickupPlace,
                pickupDeliveryTask.DeliveryPlace,
                pickupDeliveryTask.PickupPersonName,
                pickupDeliveryTask.PickupPersonPhoneNumber.Value,
                pickupDeliveryTask.DeliveryPersonName,
                pickupDeliveryTask.DeliveryPersonPhoneNumber.Value,
                pickupDeliveryTask.TaskDescription,
                pickupDeliveryTask.ConfirmationCode.Value
            );
        }

        public static SurveillanceTask ToSurveillanceDomain(CreateSurveillanceTaskDto dto)
        {
            return new SurveillanceTask(
                new UserId(dto.UserId),
                dto.RobotId,
                dto.TaskType,
                dto.Path,
                RobotMovementBulkToDomain(dto.RobotMovements),
                new PhoneNumber(dto.PhoneNumber),
                dto.FloorIds
            );
        }

        public static PickupDeliveryTask ToPickupDeliveryDomain(CreatePickupDeliveryTaskDto dto)
        {
            return new PickupDeliveryTask(
                new UserId(dto.UserId),
                dto.RobotId,
                dto.TaskType,
                dto.Path,
                RobotMovementBulkToDomain(dto.RobotMovements),
                dto.PickupPlace,
                dto.DeliveryPlace,
                dto.PickupPersonName,
                new PhoneNumber(dto.PickupPersonPhoneNumber),
                dto.DeliveryPersonName,
                new PhoneNumber(dto.DeliveryPersonPhoneNumber),
                dto.TaskDescription,
                new TaskConfirmationCode()
            );
        }

        public static List<RobotMovement> RobotMovementBulkToDomain(List<RobotMovementDto> dto)
        {

            List<RobotMovement> robotMovements = new List<RobotMovement>();

            foreach (var item in dto)
            {
                robotMovements.Add(new RobotMovement(item.X, item.Y));
            }

            return robotMovements;

        }

        public static List<RobotMovementDto> RobotMovementBulkToDto(List<RobotMovement> dto)
        {

            List<RobotMovementDto> robotMovements = new List<RobotMovementDto>();

            foreach (var item in dto)
            {
                robotMovements.Add(new RobotMovementDto(item.X, item.Y));
            }

            return robotMovements;

        }
    }
}

