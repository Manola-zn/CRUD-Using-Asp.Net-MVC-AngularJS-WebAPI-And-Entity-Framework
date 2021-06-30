using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularCRUD.Startup))]
namespace AngularCRUD
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
