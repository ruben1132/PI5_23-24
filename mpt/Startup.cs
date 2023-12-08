
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Mpt.Infrastructure;
using Mpt.Infrastructure.Shared;
using Mpt.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Mpt.IRepositories;
using Mpt.Infrastructure.Users;
using Mpt.IServices;
using Mpt.Services;
using Mpt.Infrastructure.Roles;
using Mpt.Infrastructure.Tasks;
using Mpt.Infrastructure.Plannings;

namespace Mpt
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            // Load environment variables from .env file
            DotNetEnv.Env.Load();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<MptDbContext>(opt => opt.UseSqlServer(connectionString)
                  .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);


            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors("MyPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<IPlanningRepository, PlanningRepository>();

            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<ITaskService, TaskService>();
            services.AddTransient<IPlanningService, PlanningService>();

        }
    }
}