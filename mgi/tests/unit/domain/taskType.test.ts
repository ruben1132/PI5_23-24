import { TaskType } from '../../../src/domain/taskType';
import { expect } from 'chai';

describe('TaskType', () => {
  describe('create', () => {
    it('should create a new task type', () => {
      const taskTypeOrError = TaskType.create({
        name: 'Task Type 1',
        description: 'This is a task type'
      });

      expect(taskTypeOrError.isSuccess).to.be.true;
      const taskType = taskTypeOrError.getValue();
      expect('Task Type 1').to.be.equal(taskType.name);
      expect('This is a task type').to.be.equal(taskType.description);
    });

    it('should fail to create a new task type with name set to null', () => {
      const taskTypeOrError = TaskType.create({
        name: null,
        description: 'This is a task type'
      });

      expect(taskTypeOrError.isFailure).to.be.true;
      expect('name is null or undefined').to.be.equal(taskTypeOrError.error);
    });

    it('should fail to create a new task type with description set to null', () => {
      const taskTypeOrError = TaskType.create({
        name: 'Task Type 1',
        description: null
      });

      expect(taskTypeOrError.isFailure).to.be.true;
      expect('description is null or undefined').to.be.equal(taskTypeOrError.errorValue());
    });
  });

  it('should fail to create a new task type with missing name', () => {
    const taskTypeOrError = TaskType.create({
      name: "",
      description: 'This is a task type'
    });

    expect(taskTypeOrError.isFailure).to.be.true;
    expect('name is empty').to.be.equal(taskTypeOrError.errorValue());
  });

  it('should fail to create a new task type with missing description', () => {
    const taskTypeOrError = TaskType.create({
      name: 'Task Type 1',
      description: ""
    });

    expect(taskTypeOrError.isFailure).to.be.true;
    expect('description is empty').to.be.equal(taskTypeOrError.errorValue());
  });
    
  describe('update', () => {
    it('should update the task type name', () => {
      const taskTypeOrError = TaskType.create({
        name: 'Task Type 1',
        description: 'This is a task type'
      });

      expect(taskTypeOrError.isSuccess).to.be.true;
      const taskType = taskTypeOrError.getValue();
      taskType.name = 'Task Type 2';
      expect(taskType.name).to.be.equal('Task Type 2');
    });

    it('should update the task type description', () => {
      const taskTypeOrError = TaskType.create({
        name: 'Task Type 1',
        description: 'This is a task type'
      });

      expect(taskTypeOrError.isSuccess).to.be.true;
      const taskType = taskTypeOrError.getValue();
      taskType.description = 'This is an updated task type';
      expect(taskType.description).to.be.equal('This is an updated task type');
    });
  });
});


 