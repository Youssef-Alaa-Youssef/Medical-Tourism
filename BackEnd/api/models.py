from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.shortcuts import get_object_or_404
from django.utils import timezone
import uuid
from decimal import Decimal







class Tretment_center(models.Model):
    DENTAL_SPECIALIZATION = 'Dental'
    HAIR_IMPLANT_SPECIALIZATION = 'Hair Implant'
    MEDICAL_TOURISM='Medical Tourism'

    SPECIALIZATION_CHOICES = [
        (DENTAL_SPECIALIZATION, 'Dental'),
        (HAIR_IMPLANT_SPECIALIZATION, 'Hair Implant'),
        (MEDICAL_TOURISM,'Medical Tourism')
    ]
    name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True, default=Decimal('0.0'))
    picture = models.ImageField(upload_to='images/%y/%m/%d',null=True, blank=True)
    identiy_verfication=models.ImageField(upload_to='images/verify/%y/%m/%d')     
    verfied_byadmin=models.BooleanField(default=False)

    email = models.EmailField()
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
    specialization = models.CharField(max_length=20, choices=SPECIALIZATION_CHOICES, default=DENTAL_SPECIALIZATION)
    Password = models.CharField(max_length=50, null=False)
    RepeatPassword = models.CharField(max_length=50, null=False)
    role = models.CharField(
        max_length=50,
        default="Treatment Center",
    )

    def __str__(self):
        return self.name
    


class Doctor(models.Model):

    name = models.CharField(max_length=100)
    age = models.IntegerField()
    picture = models.ImageField(upload_to='images/%y/%m/%d',null=True,blank=True)
    specialization = models.CharField(max_length=50)
    rating = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    email = models.EmailField()
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    treatment_center = models.ForeignKey(Tretment_center, on_delete=models.CASCADE,default="1")


    def __str__(self):
        return self.name



class Picture(models.Model):
    image = models.ImageField(upload_to='images/%y/%m/%d')
    def __str__(self):
        return self.image.name



class TourismCompany(models.Model):
    name = models.CharField(max_length=100)
    location= models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True, default=Decimal('0.0'))

    description = models.CharField(max_length=200)
    pictures = models.ImageField(upload_to='images/%y/%m/%d' ,null=True,blank=True)
    identiy_verfication=models.ImageField(upload_to='images/verify/%y/%m/%d')     
    verfied_byadmin=models.BooleanField(default=False)
    email = models.CharField(max_length=100)
    price = models.IntegerField(null=True, blank=True)
    Password = models.CharField(max_length=50, null=False)
    RepeatPassword = models.CharField(max_length=50, null=False)
    role = models.CharField(
        max_length=50,
        default="Tourism Company",
    )

    def __str__(self):
        return self.name
    
    @classmethod
    def get_all_campanies(cls):
        return cls.objects.all()
    
    @classmethod
    def get_specific_campany(cls,id):
        return get_object_or_404(cls,pk=id)

class TourismPlaces(models.Model):
    name = models.CharField(max_length=100)
    location= models.CharField(max_length=200)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    start_time = models.DateField()
    end_time = models.DateField()
    price = models.IntegerField()
    image = models.ImageField(upload_to='places/%y/%m/%d',default="images/23/03/27/tourism.jpg")
    tourismCompany = models.ForeignKey( TourismCompany,on_delete=models.CASCADE, related_name='places')




    def __str__(self):
        return self.name
    

    @classmethod
    def get_all_places(cls):
        return cls.objects.all()
    
    @classmethod
    def get_specific_place(cls,id):
        return get_object_or_404(cls,pk=id)




class WebsiteUsers(models.Model):
    FullName=models.CharField(max_length=50,null=False)
    age=models.IntegerField(null=True, blank=True)
    Email = models.EmailField(max_length=50, null=False, unique=True)
    PATIENT = 'Patient'
    TREATMENT_CENTER = 'Treatment Center'
    TOURIST = 'Tourist'
    TOURISM_COMPANY = 'Tourism Company'
    Role_CHOICES = [
        (PATIENT, 'Patient'),
        (TREATMENT_CENTER, 'Treatment Center'),
        (TOURIST, 'Tourist'),
        (TOURISM_COMPANY, 'Tourism Company'),
    ]
    role = models.CharField(
        max_length=50,
        choices=Role_CHOICES,
        default=PATIENT,
    )
    Password = models.CharField(max_length=50, null=False)
    RepeatPassword = models.CharField(max_length=50, null=False)
    picture = models.ImageField(upload_to='images/%y/%m/%d',default='none')
    ########### changes ##############
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.FullName

##############################################################################
class Activation(models.Model):
    user = models.OneToOneField(WebsiteUsers, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    # checking if the token is expired or not

    def is_expired(self):
        return self.expires_at <= timezone.now()

    def __str__(self):
        return f"Activation for {self.user.FullName}"
##############################################################################


class MedicalReservation(models.Model):
    user = models.ForeignKey(WebsiteUsers, on_delete=models.CASCADE)
    treatment_center = models.ForeignKey(Tretment_center, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    start_time = models.DateField()
    end_time = models.DateField()   
    price = models.DecimalField(max_digits=20, decimal_places=2)
    status=models.CharField(default='Pending Aprroval',max_length=50)


class TourismReservation(models.Model):
    user = models.ForeignKey(WebsiteUsers, on_delete=models.CASCADE)
    tourism_company = models.ForeignKey(TourismCompany, on_delete=models.CASCADE)
    tourism_places = models.ForeignKey(TourismPlaces, on_delete=models.CASCADE)
    start_time = models.DateField()
    end_time = models.DateField()   
    price = models.IntegerField()
    status=models.CharField(default='Pending Aprroval',max_length=50)

############################ Rating ########################################
class Treatment_Center_Rating(models.Model):
    treatment_center = models.ForeignKey(Tretment_center, on_delete=models.CASCADE, related_name='ratings')
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True,null=True,default="0")
    user = models.ForeignKey(WebsiteUsers, on_delete=models.CASCADE)

class Tourism_Company_Rating(models.Model):
    treatment_center = models.ForeignKey(TourismCompany, on_delete=models.CASCADE, related_name='ratings')
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True,null=True,default="0")
    user = models.ForeignKey(WebsiteUsers, on_delete=models.CASCADE)



#################################Feedback#############

class Treatment_Center_Feedback(models.Model):
    treatment_center = models.ForeignKey(Tretment_center, on_delete=models.CASCADE, related_name='feedbacks')
    feedback = models.TextField(blank=True,null=True)
    user = models.ForeignKey(WebsiteUsers, on_delete=models.CASCADE)
    isreplied = models.BooleanField(default=False)


class Tourism_Company_Feedback(models.Model):
    tourism_company = models.ForeignKey(TourismCompany, on_delete=models.CASCADE, related_name='feedbacks')
    feedback = models.TextField(blank=True,null=True)
    user = models.ForeignKey(WebsiteUsers, on_delete=models.CASCADE)
    isreplied = models.BooleanField(default=False)



class Activation(models.Model):
    user = models.OneToOneField(WebsiteUsers, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    # checking if the token is expired or not

    def is_expired(self):
        return self.expires_at <= timezone.now()

    def __str__(self):
        return f"Activation for {self.user.FullName}"



class Treatment_Payment(models.Model):
    treatment_center = models.ForeignKey(Tretment_center, on_delete=models.CASCADE)
    user_id = models.ForeignKey(WebsiteUsers, on_delete=models.CASCADE)
    payed = models.CharField(max_length=255,null=True)
class Tourism_Payment(models.Model):
    tourism_company = models.ForeignKey(TourismCompany, on_delete=models.CASCADE)
    user_id = models.ForeignKey(WebsiteUsers, on_delete=models.CASCADE)
    payed = models.CharField(max_length=255,null=True)