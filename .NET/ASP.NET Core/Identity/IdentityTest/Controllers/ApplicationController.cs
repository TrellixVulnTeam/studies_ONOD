﻿using System;
using System.Security.Claims;
using IdentCore.Identity.Models;
using Microsoft.AspNetCore.Mvc;

namespace IdentCore.Controllers
{
    /// <summary>
    /// Base class for controllers exposing strongly-typed 
    /// claims principal (wrapped into ApplicationPrincipal)
    /// </summary>
    public class ApplicationController : Controller
    {
        public ApplicationPrincipal CurrentUser
        {
            get
            {
                return new ApplicationPrincipal(User as ClaimsPrincipal);
            }
        }
    }
}
