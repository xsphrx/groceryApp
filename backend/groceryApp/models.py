from django.conf.urls import url
from django.db import models


class Order(models.Model):
    customerName = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)
    total = models.FloatField(default=0)

    def __str__(self):
        return self.customerName

    class Meta:
        ordering = ['created_at']

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.FloatField()
    info = models.CharField(max_length=100)
    picture = models.CharField(max_length=150)

    def __str__(self):
        return self.name

class ProductOrder(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.IntegerField()
