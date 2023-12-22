using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Plannings;
using Mpt.Domain.Tasks;
using Mpt.Domain.Users;

namespace tests.Domain.PlanningsTasks.Tests
{
    [TestClass]
    public class PlanningTaskTests
    {
        [TestMethod]
        public void TestPlanningId()
        {
            // Arrange
            var planningTask = new PlanningTask();
            var planningId = new PlanningId(new Guid().ToString());

            // Act
            planningTask.PlanningId = planningId;

            // Assert
            Assert.AreEqual(planningId, planningTask.PlanningId);
        }

        [TestMethod]
        public void TestPlanning()
        {
            // Arrange
            var planningTask = new PlanningTask();
            var planning = new Planning(10, new UserId(new Guid().ToString()));

            // Act
            planningTask.Planning = planning;

            // Assert
            Assert.AreEqual(planning, planningTask.Planning);
        }


        [TestMethod]
        public void TestTaskId()
        {
            // Arrange
            var planningTask = new PlanningTask();
            var taskId = new TaskId(new Guid().ToString());

            // Act
            planningTask.TaskId = taskId;

            Console.WriteLine(planningTask.TaskId);

            // Assert
            Assert.AreEqual(taskId, planningTask.TaskId);
        }

        [TestMethod]
        public void TestTask()
        {
            // Arrange
            var planningTask = new PlanningTask();
            var task = new Mpt.Domain.Tasks.Task();

            // Act
            planningTask.Task = task;

            // Assert
            Assert.AreEqual(task, planningTask.Task);
        }

        [TestMethod]
        public void TestSequenceOrder()
        {
            // Arrange
            var planningTask = new PlanningTask();
            var sequenceOrder = 10;

            // Act
            planningTask.SequenceOrder = sequenceOrder;

            // Assert
            Assert.AreEqual(sequenceOrder, planningTask.SequenceOrder);
        }
    }
}