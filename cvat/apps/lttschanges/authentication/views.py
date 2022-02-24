
from rest_auth.registration.views import RegisterView
from allauth.account import app_settings as allauth_settings
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter


# # Ltts changes- for google sign in  
# class GoogleLogin(SocialLoginView):
#     print("google login")
#     iam_classes = []
#     print("entered")
#     adapter_class = GoogleOAuth2Adapter
    


"""this class extended for adding email verified required by Savita and KalaiSelvi"""
# Ltts changes- for new register user    
class RegisterViewEx(RegisterView):
    def get_response_data(self, user):
        data = self.get_serializer(user).data
        data['email_verification_required'] = allauth_settings.EMAIL_VERIFICATION == \
            allauth_settings.EmailVerificationMethod.MANDATORY

        return data