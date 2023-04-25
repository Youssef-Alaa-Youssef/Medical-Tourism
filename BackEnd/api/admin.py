from django.contrib import admin
from .models import Tourism_Company_Feedback,Doctor,Tretment_center,Treatment_Payment,Tourism_Payment,TourismCompany,TourismPlaces,Picture,WebsiteUsers,TourismReservation,MedicalReservation,Treatment_Center_Rating,Tourism_Company_Rating,Activation,Treatment_Center_Feedback


# Register your models here.

admin.site.register(Tretment_center)
admin.site.register(Doctor)
admin.site.register(TourismPlaces)
admin.site.register(TourismCompany)
admin.site.register(Picture)
admin.site.register(WebsiteUsers)
admin.site.register(TourismReservation)
admin.site.register(MedicalReservation)
admin.site.register(Treatment_Center_Rating)
admin.site.register(Tourism_Company_Rating)
admin.site.register(Treatment_Center_Feedback)
admin.site.register(Tourism_Company_Feedback)
admin.site.register(Activation)
admin.site.register(Treatment_Payment)
admin.site.register(Tourism_Payment)