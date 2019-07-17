from django import template
from groceryApp.models import Order

register = template.Library()

@register.simple_tag()
def get_orders():
    return Order.objects.filter(processed=False).count()
