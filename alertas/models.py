from django.db import models

# Create your models here.
class Alerta(models.Model):
    nombre = models.CharField(max_length=80)
    accidente = models.CharField(max_length=80)
    lugar = models.CharField(max_length=120)
    descripcion = models.TextField(blank=True)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.accidente}"
