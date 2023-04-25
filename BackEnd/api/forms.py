from django import forms
from .models import TourismCompany,TourismPlaces,WebsiteUsers
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
class TourismCompanyForm(forms.Form):
    # pictures = forms.ImageField( widget=forms.ClearableFileInput(attrs={'multiple': True,'accept':'image/*'}))

    class Meta:
        model = TourismCompany
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'POST'
        self.helper.add_input(Submit('submit', 'Create Tourism Company'))

class TournamentPlacesForm(forms.Form):
    class Meta:
        model = TourismPlaces
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'POST'
        self.helper.add_input(Submit('submit', 'Create Tourism Places'))