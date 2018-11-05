using DSDoc3.BussinessObjects.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Text;

namespace DSDoc3.Core
{
    public class VersionHelper
    {

        public VersionModel GetVersion()
        {
            var fileName = Assembly.GetCallingAssembly().Location;
            var fileVersion = FileVersionInfo.GetVersionInfo(fileName).FileVersion;


            VersionModel result = new VersionModel()
            {
                AssemblyVersion = fileVersion,
                CommitVersion = "#23fd31"
            };
            return result;

        }
    }
}
