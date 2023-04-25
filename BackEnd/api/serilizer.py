from rest_framework import serializers
from .models import TourismCompany,TourismPlaces

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourismCompany
        fields = '__all__'

class PlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourismPlaces
        fields = '__all__'