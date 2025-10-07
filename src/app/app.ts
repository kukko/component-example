import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tree } from './tree/tree';
import { TreeNode } from '../types/tree-node';
import { TreeNodeToggledEvent } from '../types/tree-node-toggled-event';

@Component({
  selector: 'app-root',
  imports: [
    Tree
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('component-test');

  treeNodes: TreeNode[] = [
    {
      label: 'First'
    },
    {
      label: 'Second'
    },
    {
      label: 'Third',
      children: [
        {
          label: 'First child'
        },
        {
          label: 'Second child',
          children: [
            {
              label: 'First grandchildren'
            },
            {
              label: 'Second grandchildren'
            },
            {
              label: 'Third grandchildren'
            }
          ]
        },
        {
          label: 'Third child'
        }
      ]
    }
  ];

  onNodeToggled(event: TreeNodeToggledEvent) {
    console.log(event);
  }
}
