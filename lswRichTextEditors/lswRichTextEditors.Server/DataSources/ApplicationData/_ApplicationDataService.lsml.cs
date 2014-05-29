using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.LightSwitch;
using Microsoft.LightSwitch.Security.Server;
namespace LightSwitchApplication
{
	public partial class ApplicationDataService
	{
		partial void Articles_Updating(Article entity)
		{
			if (entity.Id == 1)
			{
				entity.Body = entity.Details.Properties.Body.OriginalValue;
			}

		}

	}
}
