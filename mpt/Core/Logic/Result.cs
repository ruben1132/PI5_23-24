using System;

namespace Mpt.Core.Logic
{
    public class Result<T>
    {
        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public T Value { get; }
        public string Error { get; }

        private Result(bool isSuccess, T value, string error)
        {
            if (isSuccess && error != null)
            {
                throw new InvalidOperationException("InvalidOperation: A result cannot be successful and contain an error");
            }

            if (!isSuccess && error == null)
            {
                throw new InvalidOperationException("InvalidOperation: A failing result needs to contain an error message");
            }

            IsSuccess = isSuccess;
            Value = value;
            Error = error;

            if (isSuccess)
            {
                Object.ReferenceEquals(value, default(T));
            }

            Object.ReferenceEquals(error, default(string));
        }

        public T GetValue()
        {
            if (!IsSuccess)
            {
                throw new InvalidOperationException("Can't get the value of an error result. Use 'ErrorValue' instead.");
            }

            return Value;
        }

        public T ErrorValue() => IsSuccess ? default(T) : Value;
        public static Result<T> Ok(T value) => new Result<T>(true, value, null);
        public static Result<T> Ok(string msg) => new Result<T>(true, default(T), msg);

        public static Result<T> Fail(string error) => new Result<T>(false, default(T), error);

        public static Result<T> Fail(T value, string error) => new Result<T>(false, value, error);

    }

}
