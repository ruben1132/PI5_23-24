

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
                task.IsCompleted,
                task.IsAproved,
                task.TaskType.Value
            );

        }

        public static SurveillanceTaskDto ToDto(SurveillanceTask surveillanceTask)
        {
            return new SurveillanceTaskDto(
                surveillanceTask.Id.Value,
                surveillanceTask.UserId.Value,
                surveillanceTask.RobotId,
                surveillanceTask.IsCompleted,
                surveillanceTask.IsAproved,
                surveillanceTask.TaskType.Value,
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
                pickupDeliveryTask.IsCompleted,
                pickupDeliveryTask.IsAproved,
                pickupDeliveryTask.TaskType.Value,
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
                new TaskType(dto.TaskType),
                new PhoneNumber(dto.PhoneNumber),
                dto.FloorIds
            );
        }

        public static PickupDeliveryTask ToPickupDeliveryDomain(CreatePickupDeliveryTaskDto dto)
        {
            return new PickupDeliveryTask(
                new UserId(dto.UserId),
                dto.RobotId,
                new TaskType(dto.TaskType),
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
    }
}

