from django.shortcuts import render
from django.urls import reverse, path

import boto3

def index(request):
    svg = boto3.resource('s3').Object('coloringcloud', 'svg_sheets/cheshire_cat.svg')
    body = svg.get()['Body'].read().decode('utf-8')
    colors = ["ff0000", "0000ff", "ffff00"]
    return render(request, 'color/index.haml', {'svg':body, 'colors':colors})
