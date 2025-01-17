﻿using System;
using System.Collections.Generic;

namespace Legacy.Models
{
    public partial class WeeklyPattern
    {
        public WeeklyPattern()
        {
            PassNotification = new HashSet<PassNotification>();
        }

        public int WeeklyPatternId { get; set; }
        public int EveryNthWeek { get; set; }
        public bool Sunday { get; set; }
        public bool Monday { get; set; }
        public bool Tuesday { get; set; }
        public bool Wednesday { get; set; }
        public bool Thursday { get; set; }
        public bool Friday { get; set; }
        public bool Saturday { get; set; }

        public ICollection<PassNotification> PassNotification { get; set; }
    }
}
