# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'E2_User'
        db.create_table('kernel_e2_user', (
            ('user_ptr', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['auth.User'], unique=True, primary_key=True)),
            ('e2_app', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal('kernel', ['E2_User'])

        # Adding model 'Color'
        db.create_table('kernel_color', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('label', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('hex', self.gf('django.db.models.fields.CharField')(max_length=6)),
        ))
        db.send_create_signal('kernel', ['Color'])

        # Adding model 'Company'
        db.create_table('kernel_company', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=100)),
        ))
        db.send_create_signal('kernel', ['Company'])

        # Adding model 'Contact'
        db.create_table('kernel_contact', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('gender', self.gf('django.db.models.fields.CharField')(max_length=5)),
            ('first_name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('last_name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('email', self.gf('django.db.models.fields.EmailField')(max_length=75)),
            ('birthdate', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('company', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['kernel.Company'], null=True, blank=True)),
        ))
        db.send_create_signal('kernel', ['Contact'])

        # Adding M2M table for field colors1 on 'Contact'
        db.create_table('kernel_contact_colors1', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('contact', models.ForeignKey(orm['kernel.contact'], null=False)),
            ('color', models.ForeignKey(orm['kernel.color'], null=False))
        ))
        db.create_unique('kernel_contact_colors1', ['contact_id', 'color_id'])

        # Adding M2M table for field colors2 on 'Contact'
        db.create_table('kernel_contact_colors2', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('contact', models.ForeignKey(orm['kernel.contact'], null=False)),
            ('color', models.ForeignKey(orm['kernel.color'], null=False))
        ))
        db.create_unique('kernel_contact_colors2', ['contact_id', 'color_id'])

        # Adding model 'UserProfile'
        db.create_table('kernel_userprofile', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], unique=True)),
            ('tel', self.gf('django.db.models.fields.CharField')(max_length=20, null=True, blank=True)),
            ('mobile', self.gf('django.db.models.fields.CharField')(max_length=20, null=True, blank=True)),
            ('address', self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True)),
            ('birthday', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('blog', self.gf('django.db.models.fields.URLField')(max_length=200, null=True, blank=True)),
            ('gender', self.gf('django.db.models.fields.CharField')(default='M', max_length=1)),
            ('QQ', self.gf('django.db.models.fields.CharField')(max_length=50, null=True, blank=True)),
            ('MSN', self.gf('django.db.models.fields.CharField')(max_length=50, null=True, blank=True)),
            ('position', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('country', self.gf('django.db.models.fields.CharField')(default='\xe4\xb8\xad\xe5\x9b\xbd', max_length=50, null=True, blank=True)),
        ))
        db.send_create_signal('kernel', ['UserProfile'])

        # Adding model 'AppModel'
        db.create_table('kernel_appmodel', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('classname', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('author', self.gf('django.db.models.fields.CharField')(max_length=20, null=True, blank=True)),
            ('version', self.gf('django.db.models.fields.CharField')(max_length=20, null=True, blank=True)),
            ('active', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('icon', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('url', self.gf('django.db.models.fields.URLField')(max_length=200, null=True, blank=True)),
            ('desktop', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('start', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal('kernel', ['AppModel'])

        # Adding M2M table for field group on 'AppModel'
        db.create_table('kernel_appmodel_group', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('appmodel', models.ForeignKey(orm['kernel.appmodel'], null=False)),
            ('group', models.ForeignKey(orm['auth.group'], null=False))
        ))
        db.create_unique('kernel_appmodel_group', ['appmodel_id', 'group_id'])

        # Adding model 'SampleModel'
        db.create_table('kernel_samplemodel', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('choice1', self.gf('django.db.models.fields.CharField')(max_length=5)),
            ('choice2', self.gf('django.db.models.fields.CharField')(max_length=5, null=True, blank=True)),
            ('first_name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('email', self.gf('django.db.models.fields.EmailField')(max_length=75)),
            ('birthdate', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('birthtime', self.gf('django.db.models.fields.TimeField')(null=True, blank=True)),
            ('modified', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('company', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['kernel.Company'], null=True, blank=True)),
            ('url', self.gf('django.db.models.fields.URLField')(max_length=200)),
            ('float', self.gf('django.db.models.fields.FloatField')(default=0)),
            ('decimal', self.gf('django.db.models.fields.DecimalField')(default=0, max_digits=10, decimal_places=2)),
            ('integer', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('bool', self.gf('django.db.models.fields.BooleanField')(default=True)),
        ))
        db.send_create_signal('kernel', ['SampleModel'])

        # Adding M2M table for field colors1 on 'SampleModel'
        db.create_table('kernel_samplemodel_colors1', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('samplemodel', models.ForeignKey(orm['kernel.samplemodel'], null=False)),
            ('color', models.ForeignKey(orm['kernel.color'], null=False))
        ))
        db.create_unique('kernel_samplemodel_colors1', ['samplemodel_id', 'color_id'])

        # Adding model 'Keyword'
        db.create_table('kernel_keyword', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('kernel', ['Keyword'])


    def backwards(self, orm):
        
        # Deleting model 'E2_User'
        db.delete_table('kernel_e2_user')

        # Deleting model 'Color'
        db.delete_table('kernel_color')

        # Deleting model 'Company'
        db.delete_table('kernel_company')

        # Deleting model 'Contact'
        db.delete_table('kernel_contact')

        # Removing M2M table for field colors1 on 'Contact'
        db.delete_table('kernel_contact_colors1')

        # Removing M2M table for field colors2 on 'Contact'
        db.delete_table('kernel_contact_colors2')

        # Deleting model 'UserProfile'
        db.delete_table('kernel_userprofile')

        # Deleting model 'AppModel'
        db.delete_table('kernel_appmodel')

        # Removing M2M table for field group on 'AppModel'
        db.delete_table('kernel_appmodel_group')

        # Deleting model 'SampleModel'
        db.delete_table('kernel_samplemodel')

        # Removing M2M table for field colors1 on 'SampleModel'
        db.delete_table('kernel_samplemodel_colors1')

        # Deleting model 'Keyword'
        db.delete_table('kernel_keyword')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'kernel.appmodel': {
            'Meta': {'object_name': 'AppModel'},
            'active': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'author': ('django.db.models.fields.CharField', [], {'max_length': '20', 'null': 'True', 'blank': 'True'}),
            'classname': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'desktop': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'group': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False'}),
            'icon': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'start': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'url': ('django.db.models.fields.URLField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'version': ('django.db.models.fields.CharField', [], {'max_length': '20', 'null': 'True', 'blank': 'True'})
        },
        'kernel.color': {
            'Meta': {'object_name': 'Color'},
            'hex': ('django.db.models.fields.CharField', [], {'max_length': '6'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'label': ('django.db.models.fields.CharField', [], {'max_length': '25'})
        },
        'kernel.company': {
            'Meta': {'object_name': 'Company'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'kernel.contact': {
            'Meta': {'object_name': 'Contact'},
            'birthdate': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'colors1': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': "orm['kernel.Color']", 'null': 'True', 'blank': 'True'}),
            'colors2': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'colors2'", 'null': 'True', 'symmetrical': 'False', 'to': "orm['kernel.Color']"}),
            'company': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['kernel.Company']", 'null': 'True', 'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'gender': ('django.db.models.fields.CharField', [], {'max_length': '5'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'kernel.e2_user': {
            'Meta': {'object_name': 'E2_User', '_ormbases': ['auth.User']},
            'e2_app': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'user_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['auth.User']", 'unique': 'True', 'primary_key': 'True'})
        },
        'kernel.keyword': {
            'Meta': {'ordering': "['name']", 'object_name': 'Keyword'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'kernel.samplemodel': {
            'Meta': {'object_name': 'SampleModel'},
            'birthdate': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'birthtime': ('django.db.models.fields.TimeField', [], {'null': 'True', 'blank': 'True'}),
            'bool': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'choice1': ('django.db.models.fields.CharField', [], {'max_length': '5'}),
            'choice2': ('django.db.models.fields.CharField', [], {'max_length': '5', 'null': 'True', 'blank': 'True'}),
            'colors1': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': "orm['kernel.Color']", 'null': 'True', 'blank': 'True'}),
            'company': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['kernel.Company']", 'null': 'True', 'blank': 'True'}),
            'decimal': ('django.db.models.fields.DecimalField', [], {'default': '0', 'max_digits': '10', 'decimal_places': '2'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'float': ('django.db.models.fields.FloatField', [], {'default': '0'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'integer': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'modified': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'url': ('django.db.models.fields.URLField', [], {'max_length': '200'})
        },
        'kernel.userprofile': {
            'MSN': ('django.db.models.fields.CharField', [], {'max_length': '50', 'null': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'UserProfile'},
            'QQ': ('django.db.models.fields.CharField', [], {'max_length': '50', 'null': 'True', 'blank': 'True'}),
            'address': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'birthday': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'blog': ('django.db.models.fields.URLField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'country': ('django.db.models.fields.CharField', [], {'default': "'\\xe4\\xb8\\xad\\xe5\\x9b\\xbd'", 'max_length': '50', 'null': 'True', 'blank': 'True'}),
            'gender': ('django.db.models.fields.CharField', [], {'default': "'M'", 'max_length': '1'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mobile': ('django.db.models.fields.CharField', [], {'max_length': '20', 'null': 'True', 'blank': 'True'}),
            'position': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'tel': ('django.db.models.fields.CharField', [], {'max_length': '20', 'null': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']", 'unique': 'True'})
        }
    }

    complete_apps = ['kernel']
