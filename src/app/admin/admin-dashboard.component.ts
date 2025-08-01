import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TableModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats = {
    totalUsers: 1250,
    activeUsers: 890,
    totalFormulas: 344,
    totalSimulations: 50,
    recentSignups: 45,
    systemHealth: 'Excellent'
  };

  recentUsers = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user', joined: '2024-01-15' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'user', joined: '2024-01-14' },
    { id: 3, username: 'mike_wilson', email: 'mike@example.com', role: 'user', joined: '2024-01-13' },
    { id: 4, username: 'sarah_jones', email: 'sarah@example.com', role: 'user', joined: '2024-01-12' },
    { id: 5, username: 'admin_user', email: 'admin@theonlyphysics.com', role: 'admin', joined: '2024-01-10' }
  ];

  systemMetrics = {
    cpuUsage: 23,
    memoryUsage: 45,
    diskUsage: 67,
    networkTraffic: 12
  };

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Check if user has admin privileges
    if (!this.authService.hasAdminPrivileges()) {
      // Redirect to home or show access denied
      console.log('Access denied: Admin privileges required');
    }
  }

  getSystemHealthColor(): string {
    switch (this.dashboardStats.systemHealth) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-blue-400';
      case 'Fair': return 'text-yellow-400';
      case 'Poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  }

  getMetricColor(value: number): string {
    if (value < 30) return 'text-green-400';
    if (value < 70) return 'text-yellow-400';
    return 'text-red-400';
  }
} 