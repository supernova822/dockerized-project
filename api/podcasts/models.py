from django.db import models
from django.utils.translation import ugettext_lazy as _
from users.models import User

class Podcast(models.Model):
    # Campo para registrar la fecha de creacion
    created = models.DateTimeField(auto_now_add=True)
    # Campo para registrar la fecha de actualizacion
    updated = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    album = models.CharField(max_length=255, blank=True, null=True)
    author = models.CharField(max_length=255, blank=False, null=False)
    youtube_url = models.CharField(max_length=255, blank=True, null=True)
    enabled = models.BooleanField(default=False)
    cover = models.FileField(blank=True, null=True, upload_to='covers/')
    song = models.FileField(blank=False, null=False, upload_to='songs/')
    likes_amount = models.IntegerField(blank=True, null=True, default=0)
    
    # year

    class Meta:
        verbose_name = _("Podcast")
        verbose_name_plural = _("Podcasts")

class Like(models.Model):
    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField(blank=False, null=False)
    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)