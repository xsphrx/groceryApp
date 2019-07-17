from django.conf.urls import url
from django.contrib import admin
from .models import Order, Product, ProductOrder


class ProductOrderInline(admin.TabularInline):
    model = ProductOrder
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    inlines = (ProductOrderInline, )
    list_display = ('customerName', 'total', 'processed', 'created_at')
    list_filter = ('processed', )


admin.site.register(Order, OrderAdmin)
admin.site.register(Product)
