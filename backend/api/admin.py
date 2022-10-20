from django.contrib import admin
from . forms import ProfileCreationForm, ProfileChangeForm
from django.contrib.auth.admin import UserAdmin
from . models import Blog, Comment, Profile
# Register your models here.


class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'author', 'created_at', 'updated_at',
                    'publish_status', 'category', 'total_likes')

    list_filter = ('publish_status', 'category', 'created_at', 'updated_at')

    search_fields = ('title', 'content')


ADDITIONAL_USER_FIELDS = [
    (None, {'fields': ['photo', 'bio']}),
]


class ProfileAdmin(UserAdmin):
    add_form = ProfileCreationForm
    form = ProfileChangeForm
    model = Profile
    list_display = ['username', 'email', 'photo', 'bio']
    fieldsets = UserAdmin.fieldsets + tuple(ADDITIONAL_USER_FIELDS)
    add_fieldsets = UserAdmin.add_fieldsets + tuple(ADDITIONAL_USER_FIELDS)


admin.site.register(Blog, BlogAdmin)
admin.site.register(Comment)
admin.site.register(Profile, ProfileAdmin)
