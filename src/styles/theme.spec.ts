/**
 * Theme System Tests
 * 
 * These tests verify that the centralized theme system is properly configured
 * and all CSS custom properties are defined.
 */

describe('Theme System', () => {
  let testElement: HTMLDivElement;

  beforeEach(() => {
    // Create a test element to check computed styles
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  describe('Primary Colors', () => {
    it('should define primary color', () => {
      const primaryColor = getComputedStyle(testElement).getPropertyValue('--color-primary').trim();
      expect(primaryColor).toBe('#ff6b35');
    });

    it('should define primary hover color', () => {
      const primaryHover = getComputedStyle(testElement).getPropertyValue('--color-primary-hover').trim();
      expect(primaryHover).toBe('#ff5722');
    });

    it('should define primary light color', () => {
      const primaryLight = getComputedStyle(testElement).getPropertyValue('--color-primary-light').trim();
      expect(primaryLight).toBe('#ffebe6');
    });
  });

  describe('Secondary Colors', () => {
    it('should define secondary color', () => {
      const secondaryColor = getComputedStyle(testElement).getPropertyValue('--color-secondary').trim();
      expect(secondaryColor).toBe('#4a5568');
    });

    it('should define secondary hover color', () => {
      const secondaryHover = getComputedStyle(testElement).getPropertyValue('--color-secondary-hover').trim();
      expect(secondaryHover).toBe('#2d3748');
    });
  });

  describe('Semantic Colors', () => {
    it('should define success color', () => {
      const successColor = getComputedStyle(testElement).getPropertyValue('--color-success').trim();
      expect(successColor).toBe('#10b981');
    });

    it('should define error color', () => {
      const errorColor = getComputedStyle(testElement).getPropertyValue('--color-error').trim();
      expect(errorColor).toBe('#ef4444');
    });

    it('should define warning color', () => {
      const warningColor = getComputedStyle(testElement).getPropertyValue('--color-warning').trim();
      expect(warningColor).toBe('#f59e0b');
    });
  });

  describe('Spacing System', () => {
    it('should define spacing variables', () => {
      const spacingXs = getComputedStyle(testElement).getPropertyValue('--spacing-xs').trim();
      const spacingSm = getComputedStyle(testElement).getPropertyValue('--spacing-sm').trim();
      const spacingBase = getComputedStyle(testElement).getPropertyValue('--spacing-base').trim();
      const spacingLg = getComputedStyle(testElement).getPropertyValue('--spacing-lg').trim();
      
      expect(spacingXs).toBe('0.25rem');
      expect(spacingSm).toBe('0.5rem');
      expect(spacingBase).toBe('1rem');
      expect(spacingLg).toBe('1.5rem');
    });
  });

  describe('Transitions', () => {
    it('should define transition variables', () => {
      const transitionFast = getComputedStyle(testElement).getPropertyValue('--transition-fast').trim();
      const transitionBase = getComputedStyle(testElement).getPropertyValue('--transition-base').trim();
      const transitionSlow = getComputedStyle(testElement).getPropertyValue('--transition-slow').trim();
      
      expect(transitionFast).toBe('150ms ease-in-out');
      expect(transitionBase).toBe('200ms ease-in-out');
      expect(transitionSlow).toBe('300ms ease-in-out');
    });
  });

  describe('Utility Classes', () => {
    it('should apply btn-primary class styles', () => {
      testElement.className = 'btn-primary';
      const styles = getComputedStyle(testElement);
      
      // Check that the button has the primary background color
      const bgColor = styles.backgroundColor;
      // RGB equivalent of #ff6b35
      expect(bgColor).toMatch(/rgb\(255,\s*107,\s*53\)/);
    });

    it('should apply btn-secondary class styles', () => {
      testElement.className = 'btn-secondary';
      const styles = getComputedStyle(testElement);
      
      // Check that the button has the secondary background color
      const bgColor = styles.backgroundColor;
      // RGB equivalent of #4a5568
      expect(bgColor).toMatch(/rgb\(74,\s*85,\s*104\)/);
    });

    it('should apply text-primary class styles', () => {
      testElement.className = 'text-primary';
      const styles = getComputedStyle(testElement);
      
      // Check that text has primary color
      const color = styles.color;
      expect(color).toMatch(/rgb\(255,\s*107,\s*53\)/);
    });

    it('should apply divider class styles', () => {
      testElement.className = 'divider';
      const styles = getComputedStyle(testElement);
      
      // Check divider height
      const height = styles.height;
      expect(height).toBe('8px');
    });
  });

  describe('Theme Consistency', () => {
    it('should use CSS variables for all theme colors', () => {
      // Verify that theme variables are defined and not empty
      const variables = [
        '--color-primary',
        '--color-secondary',
        '--color-success',
        '--color-error',
        '--color-warning',
        '--spacing-base',
        '--transition-base',
        '--shadow-base',
        '--radius-base'
      ];

      variables.forEach(variable => {
        const value = getComputedStyle(testElement).getPropertyValue(variable).trim();
        expect(value).toBeTruthy();
        expect(value).not.toBe('');
      });
    });
  });
});
