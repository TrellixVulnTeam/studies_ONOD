   M S B A M L   `   `   `  ����  McDonald    McDonald.BindingsWindow   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5        � Title$  BindingsWindow��5      $	��300��5      $	��300��5      .��5      ��  �� Orientation$ Vertical=�5	   	   .+�5
   
   �� -   5         ��Name$ sliderMy��5       � Minimum$ 10Q�5       � Maximum$ 40Q�5       � Value$ 20Q�5       �� TickFrequency$ 1Q�5       �� IsSnapToTickEnabled . 5      �� 5   
   -   5         ��Name$ 
textBoxLal��5      $
��LOLO��5      ��5      �� 	 �� ElementName$	 sliderMy��
 �� Path$
 Value� �� Mode$ OneWay=�6R   �� 5   
   -   5        $��23��5      $	��120��5      $��Destroy binding��5      5      �� 5   
   -   5        $��23��5      $	��120��5      $��Recreate binding��5      5      �� 5   
   $��Center=�5       ��5!      �� $	 sliderMy��$
 Value�$ TwoWay=� �� UpdateSourceTrigger$ PropertyChanged=� �� Delay$	 500��5"      5#      