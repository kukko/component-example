import { AfterContentInit, Component, ContentChild, Input, input, output, TemplateRef } from '@angular/core';
import { TreeNode } from '../../types/tree-node';
import { TreeNodeToggledEvent } from '../../types/tree-node-toggled-event';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tree',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './tree.html',
  styleUrl: './tree.scss'
})
export class Tree implements AfterContentInit {
  nodes = input.required<TreeNode[]>();
  @ContentChild(TemplateRef) projectedTemplate?: TemplateRef<any>;
  @Input() contentTemplate?: TemplateRef<any>;

  nodeToggled = output<TreeNodeToggledEvent>();

  openedNodeIndexes = new Set<number>();

  ngAfterContentInit() {
    if (!this.contentTemplate && this.projectedTemplate) {
      this.contentTemplate = this.projectedTemplate;
    }
  }

  nodeIsOpened(index: number): boolean {
    return this.openedNodeIndexes.has(index);
  }

  toggleNode(index: number) {
    if (this.openedNodeIndexes.has(index)) {
      this.openedNodeIndexes.delete(index);
      this.nodeToggled.emit({
        node: this.nodes()[index],
        isOpened: false
      });
    }
    else {
      this.openedNodeIndexes.add(index);
      this.nodeToggled.emit({
        node: this.nodes()[index],
        isOpened: true
      });
    }
  }

  getToggleNodeFunction(index: number) {
    return () => this.toggleNode(index);
  }

  getChildrenForChildTree(node: TreeNode): TreeNode[] | undefined {
    if (node.children) {
      return [
        ...node.children.map((child) => {
          const output = {
            ...child
          };
          output.parent = node;
          return output;
        })
      ];
    }
    else {
      return node.children;
    }
  }

  getLevelOfNode(node: TreeNode): number {
    let level = 0;
    let currentNode = node;
    while (currentNode.parent) {
      level++;
      currentNode = currentNode.parent;
    }
    return level;
  }
}
