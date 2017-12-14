﻿using System;
using System.Collections.Generic;

namespace Legacy.Models
{
    public partial class RoleAndPermission
    {
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        public Permission Permission { get; set; }
        public Role Role { get; set; }
    }
}
