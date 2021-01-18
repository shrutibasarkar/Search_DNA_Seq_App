from django.contrib import admin
from django.urls import path, include
admin.site.site_header = 'Ginkgo Challenge'

urlpatterns = [
	path('', include('frontend.urls')),
	path('api/', include('backend_api.urls')),
	path('admin/', admin.site.urls)
]
