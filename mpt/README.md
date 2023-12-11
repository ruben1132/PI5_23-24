# Tech used

- .NET 8
- EntityFrameworkCore 8
- Newtonsoft 13
- SQL Server

for more information, check mpt.csproj

# How to boot the project

### Install .NET 8
I generated this tutorial on ChatGPT and only tested the Linux installation

#### Install .NET 8 on Linux:

1. **Add Microsoft package repository:**
    ```bash
    wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    ```

    *Note: The above commands are for Ubuntu 20.04. If you're using a different distribution, refer to the official Microsoft documentation for the correct commands.*

2. **Install .NET SDK 8:**
    ```bash
    sudo apt-get update
    sudo apt-get install -y apt-transport-https
    sudo apt-get update
    sudo apt-get install -y dotnet-sdk-8.0
    ```

3. **Verify installation:**
    ```bash
    dotnet --version
    ```

#### Install .NET 8 on Windows:

1. **Download the .NET 8 SDK installer:**
    Visit the official .NET download page: [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download) and download the .NET 8 SDK installer for Windows.

2. **Run the installer:**
    Execute the downloaded installer and follow the on-screen instructions.

3. **Verify installation:**
    Open a new command prompt and run:
    ```bash
    dotnet --version
    ```

These steps should help you install .NET 8 on both Linux and Windows. If you encounter any issues or want more detailed information, refer to the official Microsoft .NET documentation for your specific operating system.
#### Install dependencies
```dotnet restore```


# How to add a migration
We're using a common DB for development, so you don't need to run this because I already did it.
The database is hosted on a VM within my DEI Cloud.

#### Install dotnet-ef 

```dotnet tool install --global dotnet-ef```

#### Add migration & update DB
```dotnet ef migrations add MigrationName```
```dotnet ef database update```

# Run

Run with HTTP only - run this one
```dotnet run``` 

Run with HTTP and HTTPS
```dotnet run --launch-profile https```

After the application is running, on the console it will say the url and the ports that the API is running.
The endpoints will be added to our Postman as well.
