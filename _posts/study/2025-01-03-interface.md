---
layout: single
title: "Interface란?"
categories: "common_topic"
tags: [common]
toc: true
toc_sticky: true
toc_label: "목차"
---

# 🤔 소프트웨어에서의 인터페이스?

> 소프트웨어에서의 인터페이스(Interface)는 서로 다른 소프트웨어 구성 요소, 모듈, 시스템, 혹은 사용자와 소프트웨어 간의 상호작용을 가능하게 하는 규칙, 프로토콜, 혹은 접점을 의미합니다. 인터페이스는 복잡한 내부 구현을 감추고, 상호작용의 간소화와 표준화를 통해 효율적이고 신뢰성 있는 소통을 지원합니다.

# 🫠 소프트웨어 인터페이스의 특징!

- 추상화 제공 :
  소프트웨어 인터페이스는 복잡한 내부 로직을 감추고 단순한 규칙이나 명령어로 상호작용을 정의합니다. 사용자는 내부 구현을 알 필요 없이 필요한 기능만 사용할 수 있습니다.
- 다양한 유형 :
  - 사용자 인터페이스(UI): 사용자가 소프트웨어와 상호작용하는 화면, 버튼, 명령어 등을 포함합니다.
  - 응용 프로그램 인터페이스(API): 다른 소프트웨어가 특정 기능을 호출하거나 데이터를 교환할 수 있도록 설계된 규칙입니다.
  - 시스템 인터페이스: 운영체제와 애플리케이션 또는 데이터베이스 간 상호작용을 지원합니다.
- 유연성과 표준화 :
  인터페이스는 서로 다른 플랫폼이나 시스템에서도 작동하도록 설계되며, REST API, SOAP, ODBC와 같은 표준 프로토콜을 준수하여 일관성을 유지합니다.
- 재사용 가능성 :
  소프트웨어 인터페이스는 모듈형 설계를 지원하여, 특정 인터페이스를 다양한 애플리케이션에서 재사용할 수 있습니다.

# 🥸 인터페이스가 쓰이는 디자인 패턴!

## 1. 전략 패턴(Strategy Pattern)

**목적**: 특정 행동(알고리즘)을 동적으로 변경하거나 선택할 수 있도록 하는 패턴.

**인터페이스의 역할**:

- 알고리즘 또는 행동을 정의하는 공통 인터페이스를 제공하여, 서로 다른 알고리즘을 쉽게 교체할 수 있도록 합니다.

```java
public interface PaymentStrategy {
    void pay(int amount);
}

public class CreditCardPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Credit Card.");
    }
}

public class PayPalPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using PayPal.");
    }
}
```

## 2. 데코레이터 패턴(Decorator Pattern)

**목적**: 객체에 새로운 기능을 동적으로 추가하는 패턴.

**인터페이스의 역할**:

- 원래 객체와 데코레이터 객체가 동일한 타입으로 동작할 수 있도록 공통 인터페이스를 정의합니다.

```java
public interface Coffee {
    String getDescription();
    double getCost();
}

public class SimpleCoffee implements Coffee {
    public String getDescription() {
        return "Simple Coffee";
    }
    public double getCost() {
        return 5.0;
    }
}

public class MilkDecorator implements Coffee {
    private Coffee coffee;

    public MilkDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    public String getDescription() {
        return coffee.getDescription() + ", Milk";
    }

    public double getCost() {
        return coffee.getCost() + 1.5;
    }
}
```

## 3. **팩토리 메서드 패턴(Factory Method Pattern)**

**목적**: 객체 생성 방식을 서브클래스에 위임하여, 객체 생성 로직과 클라이언트 코드를 분리하는 패턴.

**인터페이스의 역할**:

- 팩토리가 생성해야 하는 객체 타입을 정의하는 데 사용됩니다.

```java
public interface Product {
    void use();
}

public class ConcreteProductA implements Product {
    public void use() {
        System.out.println("Using Product A");
    }
}

public class ConcreteProductB implements Product {
    public void use() {
        System.out.println("Using Product B");
    }
}
```

## 4. **어댑터 패턴(Adapter Pattern)**

**목적**: 서로 다른 인터페이스를 가진 클래스들을 호환되도록 만드는 패턴.

**인터페이스의 역할**:

- 클라이언트가 기대하는 인터페이스를 정의하고, 기존 클래스의 메서드를 변환해 제공합니다.

```java
public interface Target {
    void request();
}

public class Adaptee {
    public void specificRequest() {
        System.out.println("Specific request");
    }
}

public class Adapter implements Target {
    private Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    public void request() {
        adaptee.specificRequest();
    }
}
```

이외 프록시 패턴과 컴포지트 패턴등이 있습니다.
