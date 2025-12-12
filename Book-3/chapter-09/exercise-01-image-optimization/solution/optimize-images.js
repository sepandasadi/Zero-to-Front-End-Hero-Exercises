/**
 * Image Optimization Script - Complete Solution
 *
 * Automatically generates optimized images in multiple formats and sizes
 *
 * Installation:
 * npm install sharp
 *
 * Usage:
 * 1. Place original images in ./original-images/
 * 2. Run: node optimize-images.js
 * 3. Optimized images appear in ./images/
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  inputDir: './original-images',
  outputDir: './images',
  sizes: [400, 800, 1200],
  formats: {
    jpeg: { quality: 80, progressive: true, mozjpeg: true },
    webp: { quality: 85, effort: 4 },
    avif: { quality: 75, speed: 6 }
  }
};

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

// Create output directory if needed
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
  console.log(`${colors.green}✓${colors.reset} Created ${config.outputDir} directory\n`);
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Get image metadata
 */
async function getImageInfo(inputPath) {
  const metadata = await sharp(inputPath).metadata();
  const stats = fs.statSync(inputPath);

  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size: stats.size
  };
}

/**
 * Optimize a single image to multiple formats and sizes
 */
async function optimizeImage(inputPath, outputBaseName) {
  const info = await getImageInfo(inputPath);

  console.log(`${colors.blue}📸 Processing:${colors.reset} ${path.basename(inputPath)}`);
  console.log(`   Original: ${info.width}×${info.height} ${info.format.toUpperCase()} (${formatBytes(info.size)})`);
  console.log('');

  let totalSaved = 0;
  const results = [];

  for (const size of config.sizes) {
    // Skip if original is smaller than target size
    if (info.width < size) {
      console.log(`   ${colors.yellow}⚠${colors.reset}  Skipping ${size}px (original is ${info.width}px)`);
      continue;
    }

    for (const [format, options] of Object.entries(config.formats)) {
      const extension = format === 'jpeg' ? 'jpg' : format;
      const outputPath = path.join(
        config.outputDir,
        `${outputBaseName}-${size}.${extension}`
      );

      try {
        const sharpInstance = sharp(inputPath)
          .resize(size, null, {
            withoutEnlargement: true,
            fit: 'inside'
          });

        // Apply format-specific optimization
        switch (format) {
          case 'jpeg':
            await sharpInstance.jpeg(options).toFile(outputPath);
            break;
          case 'webp':
            await sharpInstance.webp(options).toFile(outputPath);
            break;
          case 'avif':
            await sharpInstance.avif(options).toFile(outputPath);
            break;
        }

        const stats = fs.statSync(outputPath);
        const sizeKB = formatBytes(stats.size);
        const savings = info.size - stats.size;
        totalSaved += savings;

        results.push({
          format: extension.toUpperCase(),
          size: size,
          fileSize: stats.size,
          path: outputPath
        });

        console.log(`   ${colors.green}✓${colors.reset} ${path.basename(outputPath).padEnd(25)} ${sizeKB.padStart(10)}`);
      } catch (error) {
        console.error(`   ${colors.red}✗${colors.reset} Error creating ${format} ${size}px:`, error.message);
      }
    }
  }

  const savingsPercent = ((totalSaved / (info.size * results.length)) * 100).toFixed(1);
  console.log(`   ${colors.bright}Savings:${colors.reset} ${formatBytes(totalSaved)} (${savingsPercent}% reduction)`);
  console.log('');

  return results;
}

/**
 * Process all images in the input directory
 */
async function processAllImages() {
  console.log(`${colors.bright}🚀 Image Optimization Script${colors.reset}\n`);

  // Check if input directory exists
  if (!fs.existsSync(config.inputDir)) {
    console.error(`${colors.red}❌ Error:${colors.reset} Directory "${config.inputDir}" not found!\n`);
    console.log('💡 Create the directory and add your images:\n');
    console.log(`   ${colors.blue}mkdir ${config.inputDir}${colors.reset}`);
    console.log(`   # Then add your .jpg, .jpeg, or .png files\n`);
    return;
  }

  // Get all image files
  const files = fs.readdirSync(config.inputDir);
  const imageFiles = files.filter(f =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  if (imageFiles.length === 0) {
    console.log(`${colors.yellow}⚠️  No images found${colors.reset} in ${config.inputDir}`);
    console.log('   Add .jpg, .jpeg, or .png files and try again.\n');
    return;
  }

  console.log(`Found ${colors.bright}${imageFiles.length}${colors.reset} image(s) to optimize`);
  console.log(`Creating ${colors.bright}${config.sizes.length}${colors.reset} sizes × ${colors.bright}${Object.keys(config.formats).length}${colors.reset} formats = ${colors.bright}${config.sizes.length * Object.keys(config.formats).length}${colors.reset} files per image\n`);
  console.log('─'.repeat(60));
  console.log('');

  // Process each image
  let totalResults = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const inputPath = path.join(config.inputDir, file);
    const outputBaseName = `photo${i + 1}`; // photo1, photo2, etc.

    const results = await optimizeImage(inputPath, outputBaseName);
    totalResults = totalResults.concat(results);
  }

  // Summary
  console.log('─'.repeat(60));
  console.log(`\n${colors.green}✅ Optimization complete!${colors.reset}\n`);
  console.log(`${colors.bright}Summary:${colors.reset}`);
  console.log(`  • Images processed: ${imageFiles.length}`);
  console.log(`  • Files created: ${totalResults.length}`);
  console.log(`  • Output directory: ${config.outputDir}`);
  console.log('');
  console.log(`${colors.blue}📁 Generated files:${colors.reset}`);
  console.log(`   ${config.outputDir}/`);

  // Group by size
  const bySizes = {};
  totalResults.forEach(r => {
    if (!bySizes[r.size]) bySizes[r.size] = [];
    bySizes[r.size].push(r);
  });

  Object.entries(bySizes).forEach(([size, files]) => {
    const totalSize = files.reduce((sum, f) => sum + f.fileSize, 0);
    console.log(`   ├── ${size}px: ${files.length} files (${formatBytes(totalSize)})`);
  });

  console.log('');
  console.log(`${colors.green}🎉 Ready to use in your HTML!${colors.reset}\n`);
}

// Run the script
processAllImages().catch(error => {
  console.error(`${colors.red}❌ Fatal error:${colors.reset}`, error);
  process.exit(1);
});

