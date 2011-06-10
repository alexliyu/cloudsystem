#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User, Group
from django.forms import ModelForm

class E2_User(User):
    e2_app = models.CharField(max_length=200)
    
class Color(models.Model):
    label = models.CharField(max_length=25)
    hex = models.CharField(max_length=6)
    def __unicode__(self):
        return self.label
    
class Company(models.Model):
    name = models.CharField(max_length=100)
    def __unicode__(self):
        return self.name
        
class Contact(models.Model):
    gender = models.CharField(max_length=5, choices=(('M', 'M'), ('Ms', 'Ms'), ('Miss', 'Miss')))
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    birthdate = models.DateField(null=True, blank=True)
    company = models.ForeignKey(Company, null=True, blank=True)
    colors1 = models.ManyToManyField(Color, null=True, blank=True)
    colors2 = models.ManyToManyField(Color , related_name='colors2', null=True, blank=True)
    def __unicode__(self):
        return (u'%s %s %s' % (self.gender, self.first_name, self.last_name)).strip()

'''
用户配置模型，用于记录用户其他信息
'''
class UserProfile(models.Model):
        GENDER_CHOICES = (
                                    ('M', '男'),
                                    ('F', '女'),
                 )
        # 这个字段是必须的，并且只能为user，且要添加外键关联到User
        user = models.ForeignKey(User, unique=True, verbose_name='用户的额外信息')
        # 以下可以按各自需求来定义
        tel = models.CharField('电话', max_length=20, blank=True, null=True)
        mobile = models.CharField('移动电话', max_length=20, blank=True, null=True)
        address = models.CharField('家庭地址', max_length=100, blank=True, null=True)
        birthday = models.DateField('出生日期', blank=True, null=True)
        blog = models.URLField('个人主页', blank=True, null=True)
        gender = models.CharField('性别', max_length=1, choices=GENDER_CHOICES, default='M')
        QQ = models.CharField('QQ', max_length=50, blank=True, null=True)
        MSN = models.CharField(max_length=50, blank=True, null=True)
        position = models.CharField('目前所在地', max_length=200, blank=True, null=True)
        country = models.CharField('目前所在国家', max_length=50, blank=True, null=True, default='中国')


'''
应用程序模型，用于存储应用程序信息，确认应用程序是否激活
'''        
class AppModel(models.Model):
    name = models.CharField('应用程序名称', max_length=20, blank=False)
    classname = models.CharField('应用程序类', max_length=20, blank=False)
    author = models.CharField('作者', max_length=20, blank=True, null=True)
    version = models.CharField('版本号', max_length=20, blank=True, null=True)
    active = models.BooleanField('激活', blank=False, default=False)
    icon = models.CharField('图标', max_length=20, blank=True)
    url = models.URLField('外部链接', blank=True, null=True)
    desktop = models.BooleanField('桌面图标', blank=False, default=False)
    start = models.BooleanField('开始菜单', blank=False, default=False)
    group = models.ManyToManyField(Group)
    def __unicode__(self):
        return self.name
            
            
        
class SampleModel(models.Model):
    choice1 = models.CharField(verbose_name="A complex choice", max_length=5, choices=(('M', 'M'), ('Ms', 'Ms'), ('Miss', 'Miss')))
    choice2 = models.CharField(max_length=5, choices=(('M', 'M'), ('Ms', 'Ms'), ('Miss', 'Miss')), blank=True, null=True)
    colors1 = models.ManyToManyField(Color , null=True, blank=True)
    first_name = models.CharField(max_length=100)
    email = models.EmailField()
    birthdate = models.DateField(null=True, blank=True)
    birthtime = models.TimeField(null=True, blank=True)
    modified = models.DateTimeField(auto_now_add=True)
    company = models.ForeignKey(Company, null=True, blank=True)
    url = models.URLField(verbose_name='Your website')
    float = models.FloatField(default=0)
    decimal = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    integer = models.IntegerField(default=0)
    bool = models.BooleanField(default=True)
    
    
class Keyword(models.Model):
    name = models.CharField(max_length=50)
    class Meta:
        ordering = ['name']
    def __unicode__(self):
        return self.name
