export class UIService {
    updateCartUI(itemCount: number, total: string) {
      const cartCounter = document.getElementById('cart-counter');
      const cartTotal = document.getElementById('cart-total');
      
      if (cartCounter) cartCounter.textContent = itemCount.toString();
      if (cartTotal) cartTotal.textContent = total;
    }
  
    updateUserUI(isLoggedIn: boolean, userName?: string) {
      const authContainer = document.getElementById('auth-container');
      if (authContainer) {
        authContainer.innerHTML = isLoggedIn 
          ? `<div class="user-info">Welcome, ${userName}</div>`
          : `<div class="login-prompt">Please log in</div>`;
      }
    }
  
    updateOrderUI(orders: any[]) {
      const orderContainer = document.getElementById('orders-container');
      if (orderContainer) {
        orderContainer.innerHTML = orders.map(order => `
          <div class="order-card">
            <h3>Order #${order.id}</h3>
            <p>Total: ${order.total}</p>
            <p>Status: ${order.status}</p>
          </div>
        `).join('');
      }
    }
  }
  