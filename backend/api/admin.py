from django.contrib import admin

from . models import Blog, Comment
# Register your models here.


class BlogAdmin(admin.ModelAdmin):
    list_display = ('title','slug', 'author', 'created_at', 'updated_at',
                    'publish_status', 'category', 'total_likes')
    
admin.site.register(Blog, BlogAdmin)
admin.site.register(Comment)
